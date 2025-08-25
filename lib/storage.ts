// Enhanced localStorage management for Nederland Stemt
// Provides data versioning, migration, backup, and validation

interface StorageSchema {
  version: string;
  data: {
    votes?: {
      priorities: string[];
      timestamp: string;
      week: number;
      sessionId: string;
    };
    voteCounts?: { [priorityId: string]: number };
    submissions?: Array<{
      id: string;
      title: string;
      description: string;
      category: string;
      votes: number;
      submittedAt: string;
      status: 'pending' | 'approved' | 'rejected';
      csrfToken?: string;
    }>;
    emailSignups?: Array<{
      id: string;
      email: string;
      source: string;
      subscribedAt: string;
      status: 'active' | 'unsubscribed';
      preferences: {
        weeklyReminder: boolean;
        resultsUpdate: boolean;
        newFeatures: boolean;
      };
    }>;
    userPreferences?: {
      theme: 'light' | 'dark';
      language: 'nl' | 'en';
      onboardingCompleted: boolean;
      cookieConsent?: {
        necessary: boolean;
        functional: boolean;
        analytics: boolean;
        timestamp: number;
      };
    };
    analytics?: {
      sessionId: string;
      firstVisit: string;
      lastVisit: string;
      pageViews: number;
      events: Array<{
        name: string;
        data: any;
        timestamp: string;
      }>;
    };
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    backups: Array<{
      version: string;
      timestamp: string;
      size: number;
    }>;
  };
}

class EnhancedStorage {
  private readonly STORAGE_KEY = 'nederland-stemt';
  private readonly CURRENT_VERSION = '1.0.0';
  private readonly MAX_BACKUPS = 5;
  
  private data: StorageSchema | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(this.STORAGE_KEY) : null;
      
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Check if migration is needed
        if (!parsed.version || parsed.version !== this.CURRENT_VERSION) {
          this.data = this.migrateData(parsed);
          this.save();
        } else {
          this.data = parsed;
        }
      } else {
        // Create new storage structure
        this.data = this.createFreshStorage();
        this.save();
      }
    } catch (error) {
      console.error('Storage initialization failed:', error);
      this.data = this.createFreshStorage();
      this.save();
    }
  }

  private createFreshStorage(): StorageSchema {
    const now = new Date().toISOString();
    
    return {
      version: this.CURRENT_VERSION,
      data: {
        userPreferences: {
          theme: 'light',
          language: 'nl',
          onboardingCompleted: false
        }
      },
      metadata: {
        createdAt: now,
        updatedAt: now,
        backups: []
      }
    };
  }

  private migrateData(oldData: any): StorageSchema {
    console.log('Migrating storage from version', oldData.version || 'legacy', 'to', this.CURRENT_VERSION);
    
    const migrated = this.createFreshStorage();
    
    // Migrate legacy localStorage keys
    try {
      // Migrate votes
      const legacyVotes = typeof window !== 'undefined' ? localStorage.getItem('nederland-stemt-votes') : null;
      if (legacyVotes) {
        const parsed = JSON.parse(legacyVotes);
        migrated.data.votes = {
          priorities: parsed.votedPriorities || [],
          timestamp: parsed.timestamp || new Date().toISOString(),
          week: parsed.week || this.getCurrentWeek(),
          sessionId: this.generateSessionId()
        };
      }

      // Migrate vote counts
      const legacyVoteCounts = typeof window !== 'undefined' ? localStorage.getItem('nederland-stemt-vote-counts') : null;
      if (legacyVoteCounts) {
        migrated.data.voteCounts = JSON.parse(legacyVoteCounts);
      }

      // Migrate submissions
      const legacySubmissions = typeof window !== 'undefined' ? localStorage.getItem('nederland-stemt-submissions') : null;
      if (legacySubmissions) {
        migrated.data.submissions = JSON.parse(legacySubmissions);
      }

      // Migrate email signups
      const legacyEmails = typeof window !== 'undefined' ? localStorage.getItem('email_signups') : null;
      if (legacyEmails) {
        migrated.data.emailSignups = JSON.parse(legacyEmails);
      }

      // Migrate user preferences
      const legacyTheme = typeof window !== 'undefined' ? localStorage.getItem('theme_preference') : null;
      const legacyLang = typeof window !== 'undefined' ? localStorage.getItem('language_preference') : null;
      const legacyOnboarding = typeof window !== 'undefined' ? localStorage.getItem('onboarding_completed') : null;
      const legacyCookies = typeof window !== 'undefined' ? localStorage.getItem('cookie_consent') : null;
      
      if (legacyTheme || legacyLang || legacyOnboarding || legacyCookies) {
        migrated.data.userPreferences = {
          theme: (legacyTheme as 'light' | 'dark') || 'light',
          language: (legacyLang as 'nl' | 'en') || 'nl',
          onboardingCompleted: legacyOnboarding === 'true',
          cookieConsent: legacyCookies ? JSON.parse(legacyCookies) : undefined
        };
      }

      // Create backup of old data
      this.createBackup(oldData);

      // Clean up legacy keys
      this.cleanupLegacyStorage();
      
    } catch (error) {
      console.error('Migration failed:', error);
    }

    return migrated;
  }

  private createBackup(data: any) {
    if (!this.data) return;
    
    const backup = {
      version: data.version || 'legacy',
      timestamp: new Date().toISOString(),
      size: JSON.stringify(data).length
    };

    this.data.metadata.backups.unshift(backup);
    
    // Keep only the most recent backups
    if (this.data.metadata.backups.length > this.MAX_BACKUPS) {
      this.data.metadata.backups = this.data.metadata.backups.slice(0, this.MAX_BACKUPS);
    }

    // Store backup data separately
    if (typeof window !== 'undefined') {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`${this.STORAGE_KEY}-backup-${backup.timestamp}`, JSON.stringify(data));
      }
    }
  }

  private cleanupLegacyStorage() {
    const legacyKeys = [
      'nederland-stemt-votes',
      'nederland-stemt-vote-counts', 
      'nederland-stemt-submissions',
      'email_signups',
      'theme_preference',
      'language_preference',
      'onboarding_completed',
      'cookie_consent'
    ];

    legacyKeys.forEach(key => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    });
  }

  private save() {
    if (!this.data) return;
    
    this.data.metadata.updatedAt = new Date().toISOString();
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    }
  }

  private getCurrentWeek(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek) + 1;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API methods
  
  // Voting methods
  hasVotedThisWeek(): boolean {
    if (!this.data?.data.votes) return false;
    
    const voteWeek = this.data.data.votes.week;
    const currentWeek = this.getCurrentWeek();
    
    return voteWeek === currentWeek;
  }

  setVotes(priorities: string[]) {
    if (!this.data) return;
    
    this.data.data.votes = {
      priorities,
      timestamp: new Date().toISOString(),
      week: this.getCurrentWeek(),
      sessionId: this.generateSessionId()
    };
    
    this.save();
  }

  getVotes() {
    return this.data?.data.votes || null;
  }

  clearVotes() {
    if (!this.data) return;
    
    delete this.data.data.votes;
    this.save();
  }

  // Vote counting methods
  incrementVotes(priorities: string[]) {
    if (!this.data) return;
    
    if (!this.data.data.voteCounts) {
      this.data.data.voteCounts = {};
    }

    priorities.forEach(priorityId => {
      this.data!.data.voteCounts![priorityId] = (this.data!.data.voteCounts![priorityId] || 0) + 1;
    });
    
    this.save();
  }

  getVoteCounts(): { [priorityId: string]: number } {
    return this.data?.data.voteCounts || {};
  }

  // User preferences
  getUserPreferences() {
    return this.data?.data.userPreferences || {
      theme: 'light' as const,
      language: 'nl' as const,
      onboardingCompleted: false
    };
  }

  setUserPreference<K extends keyof NonNullable<StorageSchema['data']['userPreferences']>>(
    key: K, 
    value: NonNullable<StorageSchema['data']['userPreferences']>[K]
  ) {
    if (!this.data) return;
    
    if (!this.data.data.userPreferences) {
      this.data.data.userPreferences = {
        theme: 'light',
        language: 'nl', 
        onboardingCompleted: false
      };
    }

    this.data.data.userPreferences[key] = value;
    this.save();
  }

  // Data export/import
  exportData(): string {
    if (!this.data) return '{}';
    return JSON.stringify(this.data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      
      // Validate structure
      if (!imported.version || !imported.data || !imported.metadata) {
        throw new Error('Invalid data structure');
      }

      // Create backup before import
      this.createBackup(this.data);
      
      // Import new data
      this.data = imported;
      this.save();
      
      return true;
    } catch (error) {
      console.error('Data import failed:', error);
      return false;
    }
  }

  // Backup management
  getBackups() {
    return this.data?.metadata.backups || [];
  }

  restoreFromBackup(timestamp: string): boolean {
    try {
      const backupData = typeof window !== 'undefined' ? localStorage.getItem(`${this.STORAGE_KEY}-backup-${timestamp}`) : null;
      if (!backupData) return false;
      
      const backup = JSON.parse(backupData);
      
      // Create backup of current state
      this.createBackup(this.data);
      
      // Restore from backup (this will trigger migration if needed)
      this.data = this.migrateData(backup);
      this.save();
      
      return true;
    } catch (error) {
      console.error('Backup restore failed:', error);
      return false;
    }
  }

  // Storage cleanup
  cleanup() {
    // Remove old backups
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // Keep backups for 30 days
    
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`${this.STORAGE_KEY}-backup-`)) {
          const timestamp = key.replace(`${this.STORAGE_KEY}-backup-`, '');
          const backupDate = new Date(timestamp);
          
          if (backupDate < cutoffDate) {
            localStorage.removeItem(key);
          }
        }
      });
    }

    // Clean up metadata
    if (this.data) {
      this.data.metadata.backups = this.data.metadata.backups.filter(backup => {
        const backupDate = new Date(backup.timestamp);
        return backupDate >= cutoffDate;
      });
      this.save();
    }
  }

  // Storage analytics
  getStorageInfo() {
    if (!this.data) return null;
    
    const storageSize = JSON.stringify(this.data).length;
    const totalStorageUsed = typeof window !== 'undefined' 
      ? Object.keys(localStorage)
          .filter(key => key.startsWith(this.STORAGE_KEY))
          .reduce((total, key) => {
            return total + (localStorage.getItem(key)?.length || 0);
          }, 0)
      : 0;

    return {
      version: this.data.version,
      createdAt: this.data.metadata.createdAt,
      updatedAt: this.data.metadata.updatedAt,
      currentSize: storageSize,
      totalSize: totalStorageUsed,
      backupCount: this.data.metadata.backups.length,
      hasVotes: !!this.data.data.votes,
      hasSubmissions: !!(this.data.data.submissions?.length),
      hasEmailSignups: !!(this.data.data.emailSignups?.length),
    };
  }
}

// Export singleton instance
export const storage = new EnhancedStorage();

// Export for advanced usage
export type { StorageSchema };
export { EnhancedStorage };