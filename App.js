import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Header from './src/components/Header';
import Post from './src/components/Post'

export default class App extends React.Component {
  render() {

    const comments = [{
                  nickname: 'Joana Helena',
                  comment: 'Excelente foto'
                },
                {
                  nickname: 'Gustavo Pereira',
                  comment: 'Melhora essa foto'
                }]
    return (
      <>
        <View style={{ flex: 1 }}>
          <Header />
          <Post image={require('./assets/imgs/fence.jpg')} comments={comments} />
        </View>
      </>
    );
  }
}