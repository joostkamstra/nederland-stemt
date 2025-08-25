import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Get admin password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    if (password === adminPassword) {
      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
      const token = sign(
        { 
          role: 'admin', 
          timestamp: Date.now() 
        },
        jwtSecret,
        { expiresIn: '24h' }
      );
      
      return NextResponse.json({ 
        success: true, 
        token,
        message: 'Login successful' 
      });
    } else {
      // Log failed attempt
      console.log('Failed admin login attempt from IP:', 
        request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        'unknown'
      );
      
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}