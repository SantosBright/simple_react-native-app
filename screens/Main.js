import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@apollo/client";
import { getAllJobs } from "../graphql/queries";
import { arrayToRows } from "../utils/arrayToRows";
// import {  } from "react-native-web";

const Main = () => {
  const { loading, data } = useQuery(getAllJobs);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) setFilteredData(data.jobs);
  }, [data]);

  useEffect(() => {
    if (search) {
      setFilteredData(
        data.jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredData(data?.jobs || []);
    }
  }, [search]);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <View style={styles.searchCont}>
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={styles.searchInput}
            placeholder="Search Jobs"
          />
        </View>
        {!loading && (
          <FlatList
            data={Object.keys(arrayToRows(filteredData))}
            bounces={false}
            renderItem={({ item }) => (
              <View style={styles.dayList}>
                <Text style={styles.title}>{item}</Text>
                <View>
                  {arrayToRows(filteredData)[item].map((jobs) => (
                    <View style={styles.job}>
                      <Text>{jobs.title}</Text>
                      <Text style={styles.company}>
                        Company: {jobs.company.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 40
  },
  searchCont: {
    marginBottom: 10,
  },
  searchInput: {
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dayList: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  job: {
    marginTop: 10,
  },
  company: {
    marginTop: 3,
  },
});
