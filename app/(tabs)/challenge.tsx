import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image 
} from 'react-native';
import { Calendar, Clock, Users, Camera, Trophy } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface Challenge {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  theme: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
  submissionsCount: number;
}

export default function ChallengeScreen() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadCurrentChallenge();
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentChallenge) {
        const endTime = new Date('2025-01-19T23:59:59').getTime();
        const now = new Date().getTime();
        const difference = endTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft('Challenge ended');
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentChallenge]);

  const loadCurrentChallenge = async () => {
    // Mock data for current challenge
    const mockChallenge: Challenge = {
      id: 'challenge_1',
      title: 'Mediterranean Fusion',
      description: 'Create a dish that combines Mediterranean flavors with your local cuisine. Think outside the box and surprise us with your creativity!',
      ingredients: [
        'olive oil',
        'feta cheese', 
        'tomatoes',
        'oregano',
        'lemon',
        'garlic',
        'red onion'
      ],
      theme: 'Fusion',
      startDate: '2025-01-13',
      endDate: '2025-01-19',
      participantsCount: 127,
      submissionsCount: 43
    };
    setCurrentChallenge(mockChallenge);
  };

  const handleSubmitDish = () => {
    // Navigate to submission screen
    console.log('Navigate to dish submission');
  };

  const handleJoinGroup = () => {
    // Navigate to groups screen
    console.log('Navigate to groups');
  };

  if (!currentChallenge) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading current challenge...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.challengeBadge}>
            <Trophy size={20} color="#FF6B35" />
            <Text style={styles.challengeBadgeText}>Current Challenge</Text>
          </View>
          
          <Text style={styles.challengeTitle}>{currentChallenge.title}</Text>
          <Text style={styles.challengeTheme}>Theme: {currentChallenge.theme}</Text>
        </View>

        <View style={styles.heroImage}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1544510808-5c4ac4d5c6e2?w=400&h=200&fit=crop' }}
            style={styles.challengeImage}
          />
          <View style={styles.timeOverlay}>
            <Clock size={16} color="#FEFEFE" />
            <Text style={styles.timeLeftText}>{timeLeft} left</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Users size={20} color="#FF6B35" />
            <Text style={styles.statNumber}>{currentChallenge.participantsCount}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          <View style={styles.statItem}>
            <Camera size={20} color="#F7931E" />
            <Text style={styles.statNumber}>{currentChallenge.submissionsCount}</Text>
            <Text style={styles.statLabel}>Submissions</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge Description</Text>
          <Text style={styles.description}>{currentChallenge.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {currentChallenge.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientTag}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.ingredientNote}>
            Use at least 3 of these ingredients in your dish
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Participate</Text>
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Cook your dish using the required ingredients</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Take amazing photos or videos of your creation</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Submit with a creative caption and tags</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>Engage with other submissions and earn points!</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmitDish}>
            <Camera size={20} color="#FEFEFE" />
            <Text style={styles.primaryButtonText}>Submit Your Dish</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleJoinGroup}>
            <Users size={20} color="#FF6B35" />
            <Text style={styles.secondaryButtonText}>Join a Dinner Party</Text>
          </TouchableOpacity>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  challengeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 6,
  },
  challengeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  challengeTheme: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  heroImage: {
    position: 'relative',
    height: 200,
  },
  challengeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  timeOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLeftText: {
    color: '#FEFEFE',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
    paddingVertical: 20,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FEFEFE',
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  ingredientTag: {
    backgroundColor: '#FFF3F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  ingredientText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  ingredientNote: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  stepContainer: {
    marginTop: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FEFEFE',
    fontSize: 14,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    marginTop: 2,
  },
  actionButtons: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FEFEFE',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FEFEFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  secondaryButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});