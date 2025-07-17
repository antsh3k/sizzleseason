import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  RefreshControl,
  SafeAreaView 
} from 'react-native';
import { Heart, MessageCircle, Share, Clock, Users } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface Submission {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  user: {
    displayName: string;
    avatarUrl?: string;
    rankLevel: string;
  };
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  tags: string[];
  challengeTitle: string;
}

export default function FeedScreen() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadFeed();
      }
    });
    return unsubscribe;
  }, []);

  const loadFeed = async () => {
    // Mock data for now - in real app this would fetch from database
    const mockSubmissions: Submission[] = [
      {
        id: '1',
        title: 'Mediterranean Quinoa Bowl',
        description: 'A fresh take on Mediterranean flavors with quinoa, roasted vegetables, and homemade tzatziki!',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
        user: {
          displayName: 'Sarah Chen',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          rankLevel: 'Master Chef'
        },
        likesCount: 24,
        commentsCount: 8,
        createdAt: '2h ago',
        tags: ['mediterranean', 'healthy', 'quinoa'],
        challengeTitle: 'Mediterranean Fusion'
      },
      {
        id: '2',
        title: 'Greek-Style Tacos',
        description: 'Who says you can\'t mix Greek and Mexican? These tacos are incredible!',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
        user: {
          displayName: 'Mike Rodriguez',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          rankLevel: 'Seasoned Cook'
        },
        likesCount: 18,
        commentsCount: 5,
        createdAt: '4h ago',
        tags: ['fusion', 'tacos', 'greek'],
        challengeTitle: 'Mediterranean Fusion'
      },
      {
        id: '3',
        title: 'Feta & Herb Stuffed Chicken',
        description: 'Juicy chicken breast stuffed with feta, herbs, and sun-dried tomatoes. Pure magic!',
        imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
        user: {
          displayName: 'Emma Thompson',
          avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          rankLevel: 'Rising Star'
        },
        likesCount: 31,
        commentsCount: 12,
        createdAt: '6h ago',
        tags: ['chicken', 'feta', 'herbs'],
        challengeTitle: 'Mediterranean Fusion'
      }
    ];
    setSubmissions(mockSubmissions);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  };

  const handleLike = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { ...sub, likesCount: sub.likesCount + 1 }
        : sub
    ));
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Master Chef': return '#FF6B35';
      case 'Seasoned Cook': return '#F7931E';
      case 'Rising Star': return '#4CAF50';
      default: return '#8E8E93';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Sizzle Season</Text>
        <Text style={styles.headerSubtitle}>Community Feed</Text>
      </View>

      <ScrollView 
        style={styles.feed}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {submissions.map((submission) => (
          <View key={submission.id} style={styles.submissionCard}>
            <View style={styles.submissionHeader}>
              <View style={styles.userInfo}>
                <Image 
                  source={{ uri: submission.user.avatarUrl }} 
                  style={styles.avatar}
                />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{submission.user.displayName}</Text>
                  <View style={styles.rankContainer}>
                    <Text style={[styles.rankText, { color: getRankColor(submission.user.rankLevel) }]}>
                      {submission.user.rankLevel}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.timeContainer}>
                <Clock size={14} color="#8E8E93" />
                <Text style={styles.timeText}>{submission.createdAt}</Text>
              </View>
            </View>

            <Text style={styles.challengeTag}>#{submission.challengeTitle}</Text>

            <Image source={{ uri: submission.imageUrl }} style={styles.submissionImage} />

            <View style={styles.submissionContent}>
              <Text style={styles.submissionTitle}>{submission.title}</Text>
              <Text style={styles.submissionDescription}>{submission.description}</Text>
              
              <View style={styles.tagsContainer}>
                {submission.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleLike(submission.id)}
                >
                  <Heart size={20} color="#FF6B35" />
                  <Text style={styles.actionText}>{submission.likesCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <MessageCircle size={20} color="#8E8E93" />
                  <Text style={styles.actionText}>{submission.commentsCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Share size={20} color="#8E8E93" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FEFEFE',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  feed: {
    flex: 1,
  },
  submissionCard: {
    backgroundColor: '#FEFEFE',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  submissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  rankContainer: {
    marginTop: 2,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  challengeTag: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  submissionImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  submissionContent: {
    padding: 16,
  },
  submissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  submissionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
    fontWeight: '500',
  },
});