import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Share 
} from 'react-native';
import { 
  Trophy, 
  Star, 
  Camera, 
  Users, 
  Heart, 
  Award, 
  TrendingUp,
  Settings,
  LogOut,
  Instagram
} from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  bio: string;
  totalScore: number;
  rankLevel: string;
  submissionsCount: number;
  groupsCreated: number;
  likesReceived: number;
  joinedAt: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

interface RecentSubmission {
  id: string;
  title: string;
  imageUrl: string;
  likesCount: number;
  challengeTitle: string;
  createdAt: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadProfile();
        loadAchievements();
        loadRecentSubmissions();
      }
    });
    return unsubscribe;
  }, []);

  const loadProfile = async () => {
    // Mock profile data with scoring system
    const mockProfile: UserProfile = {
      id: 'user_1',
      displayName: user?.displayName || 'Food Explorer',
      email: user?.email || 'explorer@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: 'Passionate home cook exploring flavors from around the world 🌍👨‍🍳',
      totalScore: 1250,
      rankLevel: 'Seasoned Cook',
      submissionsCount: 12,
      groupsCreated: 3,
      likesReceived: 89,
      joinedAt: 'December 2024'
    };
    setProfile(mockProfile);
  };

  const loadAchievements = async () => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Dish',
        description: 'Submit your first cooking challenge',
        icon: '🍽️',
        unlockedAt: '2 weeks ago',
        isUnlocked: true
      },
      {
        id: '2',
        title: 'Social Butterfly',
        description: 'Receive 50 likes on your submissions',
        icon: '🦋',
        unlockedAt: '1 week ago',
        isUnlocked: true
      },
      {
        id: '3',
        title: 'Group Leader',
        description: 'Create your first dinner party group',
        icon: '👥',
        unlockedAt: '5 days ago',
        isUnlocked: true
      },
      {
        id: '4',
        title: 'Fusion Master',
        description: 'Win a fusion cooking challenge',
        icon: '🏆',
        isUnlocked: false
      },
      {
        id: '5',
        title: 'Community Star',
        description: 'Receive 100 likes total',
        icon: '⭐',
        isUnlocked: false
      },
      {
        id: '6',
        title: 'Challenge Creator',
        description: 'Have your challenge idea selected',
        icon: '💡',
        isUnlocked: false
      }
    ];
    setAchievements(mockAchievements);
  };

  const loadRecentSubmissions = async () => {
    const mockSubmissions: RecentSubmission[] = [
      {
        id: '1',
        title: 'Mediterranean Quinoa Bowl',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
        likesCount: 24,
        challengeTitle: 'Mediterranean Fusion',
        createdAt: '2d ago'
      },
      {
        id: '2',
        title: 'Greek-Style Tacos',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop',
        likesCount: 18,
        challengeTitle: 'Mediterranean Fusion',
        createdAt: '1w ago'
      },
      {
        id: '3',
        title: 'Herb-Crusted Salmon',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
        likesCount: 31,
        challengeTitle: 'Healthy Comfort',
        createdAt: '2w ago'
      }
    ];
    setRecentSubmissions(mockSubmissions);
  };

  const getRankInfo = (rankLevel: string) => {
    const ranks = {
      'Novice Chef': { color: '#8E8E93', nextRank: 'Rising Star', pointsNeeded: 500 },
      'Rising Star': { color: '#4CAF50', nextRank: 'Seasoned Cook', pointsNeeded: 1000 },
      'Seasoned Cook': { color: '#F7931E', nextRank: 'Master Chef', pointsNeeded: 2000 },
      'Master Chef': { color: '#FF6B35', nextRank: 'Culinary Legend', pointsNeeded: 5000 },
      'Culinary Legend': { color: '#9C27B0', nextRank: null, pointsNeeded: null }
    };
    return ranks[rankLevel] || ranks['Novice Chef'];
  };

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: `Check out my Sizzle Season profile! I'm a ${profile?.rankLevel} with ${profile?.totalScore} points! 🔥`,
        url: 'https://sizzleseason.app/profile/' + profile?.id
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleLogout = () => {
    blink.auth.logout();
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const rankInfo = getRankInfo(profile.rankLevel);
  const progressPercentage = rankInfo.pointsNeeded 
    ? Math.min((profile.totalScore / rankInfo.pointsNeeded) * 100, 100)
    : 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
              <LogOut size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
          <Text style={styles.displayName}>{profile.displayName}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          
          <View style={styles.rankContainer}>
            <View style={styles.rankBadge}>
              <Trophy size={16} color={rankInfo.color} />
              <Text style={[styles.rankText, { color: rankInfo.color }]}>
                {profile.rankLevel}
              </Text>
            </View>
            <Text style={styles.scoreText}>{profile.totalScore} points</Text>
          </View>

          {rankInfo.nextRank && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  Progress to {rankInfo.nextRank}
                </Text>
                <Text style={styles.progressPoints}>
                  {profile.totalScore}/{rankInfo.pointsNeeded}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${progressPercentage}%`, backgroundColor: rankInfo.color }
                  ]} 
                />
              </View>
            </View>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Camera size={20} color="#FF6B35" />
              <Text style={styles.statNumber}>{profile.submissionsCount}</Text>
              <Text style={styles.statLabel}>Dishes</Text>
            </View>
            <View style={styles.statItem}>
              <Users size={20} color="#F7931E" />
              <Text style={styles.statNumber}>{profile.groupsCreated}</Text>
              <Text style={styles.statLabel}>Groups</Text>
            </View>
            <View style={styles.statItem}>
              <Heart size={20} color="#E91E63" />
              <Text style={styles.statNumber}>{profile.likesReceived}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShareProfile}>
              <Instagram size={20} color="#FF6B35" />
              <Text style={styles.shareButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.isUnlocked && styles.achievementCardLocked
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.isUnlocked && styles.achievementTitleLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.isUnlocked && styles.achievementDescriptionLocked
                ]}>
                  {achievement.description}
                </Text>
                {achievement.isUnlocked && achievement.unlockedAt && (
                  <Text style={styles.achievementDate}>{achievement.unlockedAt}</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Submissions</Text>
          <View style={styles.submissionsGrid}>
            {recentSubmissions.map((submission) => (
              <TouchableOpacity key={submission.id} style={styles.submissionCard}>
                <Image source={{ uri: submission.imageUrl }} style={styles.submissionImage} />
                <View style={styles.submissionOverlay}>
                  <View style={styles.submissionLikes}>
                    <Heart size={12} color="#FEFEFE" />
                    <Text style={styles.submissionLikesText}>{submission.likesCount}</Text>
                  </View>
                </View>
                <Text style={styles.submissionTitle}>{submission.title}</Text>
                <Text style={styles.submissionChallenge}>#{submission.challengeTitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scoring System</Text>
          <View style={styles.scoringInfo}>
            <View style={styles.scoringItem}>
              <Award size={16} color="#4CAF50" />
              <Text style={styles.scoringText}>Submit a dish: +50 points</Text>
            </View>
            <View style={styles.scoringItem}>
              <Heart size={16} color="#E91E63" />
              <Text style={styles.scoringText}>Receive a like: +5 points</Text>
            </View>
            <View style={styles.scoringItem}>
              <Users size={16} color="#F7931E" />
              <Text style={styles.scoringText}>Create a group: +25 points</Text>
            </View>
            <View style={styles.scoringItem}>
              <Trophy size={16} color="#FF6B35" />
              <Text style={styles.scoringText}>Win a challenge: +200 points</Text>
            </View>
            <View style={styles.scoringItem}>
              <TrendingUp size={16} color="#9C27B0" />
              <Text style={styles.scoringText}>Daily engagement: +10 points</Text>
            </View>
          </View>
        </View>

        <View style={styles.memberSince}>
          <Text style={styles.memberSinceText}>Member since {profile.joinedAt}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  header: {
    backgroundColor: '#FEFEFE',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerButton: {
    marginLeft: 16,
  },
  profileSection: {
    backgroundColor: '#FEFEFE',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  rankContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
  },
  progressPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  actionButtons: {
    width: '100%',
  },
  shareButton: {
    backgroundColor: '#FFF3F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  shareButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#FEFEFE',
    marginTop: 12,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  achievementsScroll: {
    paddingLeft: 20,
  },
  achievementCard: {
    backgroundColor: '#F8F9FA',
    width: 120,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  achievementCardLocked: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E5E5EA',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#8E8E93',
  },
  achievementDescription: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 4,
  },
  achievementDescriptionLocked: {
    color: '#8E8E93',
  },
  achievementDate: {
    fontSize: 9,
    color: '#4CAF50',
    fontWeight: '500',
  },
  submissionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  submissionCard: {
    width: '31%',
    marginRight: '3.5%',
    marginBottom: 16,
  },
  submissionImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  submissionOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  submissionLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  submissionLikesText: {
    color: '#FEFEFE',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  submissionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  submissionChallenge: {
    fontSize: 10,
    color: '#FF6B35',
    fontWeight: '500',
  },
  scoringInfo: {
    paddingHorizontal: 20,
  },
  scoringItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoringText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 12,
  },
  memberSince: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  memberSinceText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});