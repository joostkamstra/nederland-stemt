import { NextRequest, NextResponse } from 'next/server';
import { defaultPriorities } from '@/lib/priorities';

// In-memory storage for MVP (will be replaced with database)
const voteStorage: { [priorityId: string]: number } = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priorities } = body;

    // Validation
    if (!priorities || !Array.isArray(priorities)) {
      return NextResponse.json(
        { error: 'Invalid priorities array' },
        { status: 400 }
      );
    }

    if (priorities.length !== 3) {
      return NextResponse.json(
        { error: 'Must select exactly 3 priorities' },
        { status: 400 }
      );
    }

    // Validate priority IDs
    const validIds = defaultPriorities.map(p => p.id);
    const invalidPriorities = priorities.filter(id => !validIds.includes(id));
    if (invalidPriorities.length > 0) {
      return NextResponse.json(
        { error: 'Invalid priority IDs' },
        { status: 400 }
      );
    }

    // Rate limiting (basic IP-based for MVP)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // For MVP, we'll trust localStorage to handle duplicate votes
    // In production, implement proper rate limiting

    // Increment vote counts
    priorities.forEach((priorityId: string) => {
      voteStorage[priorityId] = (voteStorage[priorityId] || 0) + 1;
    });

    // Generate a simple vote ID
    const voteId = `vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log('Vote recorded:', {
      voteId,
      priorities,
      ip: ip.substring(0, 10) + '...', // Log partial IP for debugging
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      voteId,
      message: 'Vote recorded successfully'
    });

  } catch (error) {
    console.error('Vote API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return current vote counts
    const results = defaultPriorities.map(priority => ({
      id: priority.id,
      title: priority.title,
      votes: voteStorage[priority.id] || 0,
      percentage: 0 // Will be calculated on frontend
    }));

    const totalVotes = Object.values(voteStorage).reduce((sum, count) => sum + count, 0);

    // Calculate percentages
    results.forEach(result => {
      result.percentage = totalVotes > 0 ? (result.votes / totalVotes) * 100 : 0;
    });

    // Sort by votes
    results.sort((a, b) => b.votes - a.votes);

    return NextResponse.json({
      results,
      totalVotes,
      week: getCurrentWeek(),
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Results API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) + 1;
}