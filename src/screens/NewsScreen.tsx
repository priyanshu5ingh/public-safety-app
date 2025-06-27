import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Chip, ActivityIndicator } from 'react-native-paper';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  category: 'crime' | 'accident' | 'safety';
  timestamp: string;
  url: string;
}

const NewsScreen = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      // TODO: Replace with actual API call
      // Mock data for now
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'Major Traffic Accident on Main Street',
          description: 'A serious accident occurred at the intersection of Main Street and 5th Avenue...',
          source: 'Local News',
          category: 'accident',
          timestamp: '2024-02-20T10:30:00Z',
          url: 'https://example.com/news/1',
        },
        {
          id: '2',
          title: 'New Safety Measures Implemented Downtown',
          description: 'City officials announce new traffic safety measures...',
          source: 'City News',
          category: 'safety',
          timestamp: '2024-02-20T09:15:00Z',
          url: 'https://example.com/news/2',
        },
      ];
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const filteredNews = selectedCategory
    ? news.filter((item) => item.category === selectedCategory)
    : news;

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <View style={styles.cardFooter}>
          <Chip
            mode="outlined"
            style={styles.chip}
            onPress={() => setSelectedCategory(item.category)}
          >
            {item.category}
          </Chip>
          <Paragraph style={styles.source}>{item.source}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Chip
          selected={selectedCategory === null}
          onPress={() => setSelectedCategory(null)}
          style={styles.filterChip}
        >
          All
        </Chip>
        <Chip
          selected={selectedCategory === 'crime'}
          onPress={() => setSelectedCategory('crime')}
          style={styles.filterChip}
        >
          Crime
        </Chip>
        <Chip
          selected={selectedCategory === 'accident'}
          onPress={() => setSelectedCategory('accident')}
          style={styles.filterChip}
        >
          Accidents
        </Chip>
        <Chip
          selected={selectedCategory === 'safety'}
          onPress={() => setSelectedCategory('safety')}
          style={styles.filterChip}
        >
          Safety
        </Chip>
      </View>

      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  filterChip: {
    marginRight: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
  },
  source: {
    fontSize: 12,
    color: '#666',
  },
});

export default NewsScreen; 