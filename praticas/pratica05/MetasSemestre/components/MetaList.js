import { useRef } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function MetaItem({ item, onDelete, onToggle }) {
  const hover = useRef(new Animated.Value(0)).current;

  function animarHover(valor) {
    Animated.timing(hover, {
      toValue: valor,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  const backgroundColor = hover.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#e5e7eb'],
  });

  const scale = hover.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.005],
  });

  return (
    <Animated.View
      style={[
        styles.meta,
        {
          backgroundColor,
          borderRadius: 15,
          transform: [{ scale }],
        },
      ]}
    >
      <Pressable
        style={styles.areaMeta}
        android_ripple={{ color: '#d1d5db' }}
        onPress={() => onToggle(item.id)}
        onHoverIn={() => animarHover(1)}
        onHoverOut={() => animarHover(0)}
      >
        <Text
          style={[
            styles.textoMeta,
            item.concluida && styles.textoConcluido,
          ]}
        >
          {item.texto}
        </Text>
      </Pressable>

      <View style={styles.areaRemover}>
        <Pressable
          style={({ pressed }) => [
            styles.botaoRemover,
            pressed && styles.botaoPressionado,
          ]}
          android_ripple={{ color: '#ffffff55' }}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.textoBotao}>Remover</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

export default function MetaList({ metas, onDelete, onToggle }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.listaVazia}>
          Nenhuma meta cadastrada.
        </Text>
      }
      renderItem={({ item }) => (
        <MetaItem
          item={item}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },

  areaMeta: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15
  },

  textoMeta: {
    fontSize: 16,
  },

  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#888',
  },

  areaRemover: {
    justifyContent: 'center',
    paddingRight: 10,
  },

  botaoRemover: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  listaVazia: {
    textAlign: 'center',
    color: '#666',
    marginTop: 30,
  },
});