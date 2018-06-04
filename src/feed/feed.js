import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton
} from "@material-ui/core";
import { Web } from "mdi-material-ui";
import FeedListingItem from "./feed_listing";

const styles = {
  card: {
    height: 250,
    marginBottom: 20,
    marginTop: 20
  }
};

export default class Feed extends Component {
  renderResponse(baseUrl, graphqlQuery) {
    console.log(baseUrl);
    const client = new ApolloClient({
      link: baseUrl,
      cache: new InMemoryCache()
    });
    client
      .query({
        query: graphqlQuery
      })
      .then(response => {
        return <FeedListingItem listingData={response.data} />;
      })
      .catch(function(error) {
        console.log(error);
        return <div>Something bad happened: {error.message}</div>;
      });
  }
  render() {
    const feedData = [this.props.data];
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        {feedData.map(feedListingItemData => (
          <Card key={feedListingItemData.key} style={styles.card}>
            <CardHeader
              avatar={
                <Avatar aria-label={feedListingItemData.title}>
                  {feedListingItemData.icon}
                </Avatar>
              }
              title={feedListingItemData.title}
              subheader={feedListingItemData.subheader}
              action={
                <a target="_blank" href={feedListingItemData.link}>
                  <IconButton>
                    <Web />
                  </IconButton>
                </a>
              }
            />
            <CardContent>
              {this.renderResponse(
                feedListingItemData.baseUrl,
                feedListingItemData.graphqlQuery
              )}
            </CardContent>
          </Card>
        ))}
      </Grid>
    );
  }
}
