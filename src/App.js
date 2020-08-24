import React, {useEffect, useState} from "react";

import api from "./services/api"

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
        console.log(response.data)
        setRepos(response.data);
      })
    }, [])


  async function handleLikeRepository(id) {
   const response = await api.post(`/repositories/${id}/like`);

   const likedRepo = response.data; 
      const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id) {
        return likedRepo
      } else {
        return repository;
      }
     })
      // const { id } = request.params;
    
      // const repository = repositories.find(repository => repository.id === id);
    
      // if (!repository) {
      //   return response.status(400).json({ error: 'Repository not found.' });
      // }
    
      // repository.likes++;
      setRepos(repositoriesUpdated);
      
      // return response.json(repository);
    
  }

  // app.get("/repositories", (request, response) => {
  
  //   const {title} = request.query;
  
  //   const results = title ? repositories.filter(project => project.title.includes(title)) : repositories;
  
  //   return response.json(results);
  // });

  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
        <FlatList data={repositories} keyExtractor={repository => repository.id} renderItem={ ({item: repository}) => (
          <>
          <Text style={styles.repository}>{repository.title}</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              {repository.techs.map(tech => (<Text key={tech} style={styles.tech}>{tech}</Text>))}
            </Text>
            {/* <Text style={styles.tech}>
              Node.js
            </Text> */}
          </View>
          <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes} curtidas
                </Text>
              </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>

          
           </>
           )} />
        </View>


        {/* <View style={styles.container}>
          <FlatList  data={repositories} keyExtractor={repository => repository.id} renderItem={({item: repository}) => (            
            <View style={styles.repositoryContainer}>
              <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
             {repository.likes}
            </Text>
          </View>
                <Text >{repository.title}</Text>
                <Text >{repository.url}</Text>
                <Text>{repository.techs}</Text>
                <Text>{repository.likes}</Text> 
            <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
              </View>
                
            )} />
        </View> */}

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
