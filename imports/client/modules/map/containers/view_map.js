import {useDeps} from 'mantra-core';
import {withRedux, composeAll} from 'react-komposer-plus';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import view_map from '../components/view_map';


const GET_DESTINATION = gql`
  query getDestination($destinationSlug: String) {
      destination(slug: $destinationSlug) {
        _id
        slug
        title
        subtitle
        mainImage {
          cdnUrl
        }
        groundImage {
          image
          north
          south
          east
          west
        }
        pois {
          _id
          type
          title
          subtitle
          shortDescription
          phone
          mail
          iconName
          lat
          lng
          mainImage {
            cdnUrl
          }
        }
      }
    }
`;


const GET_DESTINATION_WITH_PROPS = graphql(GET_DESTINATION, {
    options: (ownProps) => ({ variables: { destinationSlug: ownProps.someDestination } }),
    props: ({ ownProps, data }) => {
        if (data.loading) return { loading: true };
        if (data.error) return { hasErrors: true };
        return {
            destination: data.destination
        };
    }
});




export const mapDepsToProps = (context, actions) => ({
    context: () => context
});



export default composeAll(
    useDeps(mapDepsToProps),
    GET_DESTINATION_WITH_PROPS
)(view_map);

