import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  TextInput 
} from 'react-native';
import { Users, Plus, Search, Crown, Clock, MapPin } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface Group {
  id: string;
  name: string;
  description: string;
  creatorName: string;
  creatorAvatar: string;
  memberCount: number;
  maxMembers: number;
  challengeTitle: string;
  isPrivate: boolean;
  location?: string;
  createdAt: string;
}

export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadGroups();
      }
    });
    return unsubscribe;
  }, []);

  const loadGroups = async () => {
    // Mock data for groups
    const mockGroups: Group[] = [
      {
        id: '1',
        name: 'Mediterranean Masters',
        description: 'A group of passionate cooks exploring Mediterranean cuisine together!',
        creatorName: 'Chef Maria',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        memberCount: 4,
        maxMembers: 6,
        challengeTitle: 'Mediterranean Fusion',
        isPrivate: false,
        location: 'San Francisco, CA',
        createdAt: '2h ago'
      },
      {
        id: '2',
        name: 'Fusion Foodies',
        description: 'Experimenting with fusion cuisine and having fun with it!',
        creatorName: 'Alex Kim',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        memberCount: 3,
        maxMembers: 5,
        challengeTitle: 'Mediterranean Fusion',
        isPrivate: false,
        location: 'New York, NY',
        createdAt: '4h ago'
      },
      {
        id: '3',
        name: 'Weekend Warriors',
        description: 'Busy professionals who love to cook together on weekends',
        creatorName: 'Sarah Chen',
        creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        memberCount: 2,
        maxMembers: 4,
        challengeTitle: 'Mediterranean Fusion',
        isPrivate: true,
        location: 'Los Angeles, CA',
        createdAt: '1d ago'
      },
      {
        id: '4',
        name: 'College Cooking Club',
        description: 'Students learning to cook amazing dishes on a budget',
        creatorName: 'Mike Johnson',
        creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        memberCount: 6,
        maxMembers: 8,
        challengeTitle: 'Mediterranean Fusion',
        isPrivate: false,
        location: 'Austin, TX',
        createdAt: '2d ago'
      }
    ];
    setGroups(mockGroups);
  };

  const handleCreateGroup = () => {
    console.log('Navigate to create group screen');
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, memberCount: group.memberCount + 1 }
        : group
    ));
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dinner Party Groups</Text>
        <Text style={styles.headerSubtitle}>Cook together, share the experience</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search groups..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
          <Plus size={20} color="#FEFEFE" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.groupsList}>
        {filteredGroups.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupHeader}>
              <View style={styles.groupInfo}>
                <View style={styles.groupTitleRow}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  {group.isPrivate && (
                    <View style={styles.privateTag}>
                      <Text style={styles.privateText}>Private</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.groupDescription}>{group.description}</Text>
              </View>
            </View>

            <View style={styles.creatorInfo}>
              <Image source={{ uri: group.creatorAvatar }} style={styles.creatorAvatar} />
              <View style={styles.creatorDetails}>
                <View style={styles.creatorRow}>
                  <Crown size={14} color="#F7931E" />
                  <Text style={styles.creatorName}>{group.creatorName}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Clock size={12} color="#8E8E93" />
                  <Text style={styles.metaText}>{group.createdAt}</Text>
                </View>
              </View>
            </View>

            {group.location && (
              <View style={styles.locationRow}>
                <MapPin size={14} color="#8E8E93" />
                <Text style={styles.locationText}>{group.location}</Text>
              </View>
            )}

            <View style={styles.challengeTag}>
              <Text style={styles.challengeTagText}>#{group.challengeTitle}</Text>
            </View>

            <View style={styles.groupFooter}>
              <View style={styles.memberInfo}>
                <Users size={16} color="#666666" />
                <Text style={styles.memberText}>
                  {group.memberCount}/{group.maxMembers} members
                </Text>
              </View>

              <TouchableOpacity 
                style={[
                  styles.joinButton,
                  group.memberCount >= group.maxMembers && styles.joinButtonDisabled
                ]}
                onPress={() => handleJoinGroup(group.id)}
                disabled={group.memberCount >= group.maxMembers}
              >
                <Text style={[
                  styles.joinButtonText,
                  group.memberCount >= group.maxMembers && styles.joinButtonTextDisabled
                ]}>
                  {group.memberCount >= group.maxMembers ? 'Full' : 'Join'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {filteredGroups.length === 0 && (
          <View style={styles.emptyState}>
            <Users size={48} color="#E5E5EA" />
            <Text style={styles.emptyTitle}>No groups found</Text>
            <Text style={styles.emptyDescription}>
              {searchQuery ? 'Try a different search term' : 'Be the first to create a dinner party group!'}
            </Text>
            <TouchableOpacity style={styles.createGroupButton} onPress={handleCreateGroup}>
              <Plus size={20} color="#FEFEFE" />
              <Text style={styles.createGroupButtonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        )}
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
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FEFEFE',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 8,
  },
  createButton: {
    backgroundColor: '#FF6B35',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupsList: {
    flex: 1,
    paddingTop: 8,
  },
  groupCard: {
    backgroundColor: '#FEFEFE',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  groupHeader: {
    marginBottom: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  privateTag: {
    backgroundColor: '#FFF3F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  privateText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF6B35',
  },
  groupDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  creatorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  challengeTag: {
    backgroundColor: '#FFF3F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  challengeTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  joinButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  joinButtonText: {
    color: '#FEFEFE',
    fontSize: 14,
    fontWeight: '600',
  },
  joinButtonTextDisabled: {
    color: '#8E8E93',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  createGroupButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createGroupButtonText: {
    color: '#FEFEFE',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});