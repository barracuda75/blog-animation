import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/omdb"
import BlackBox from "./BlackBox.js";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentDidMount() {
    this.refreshSingleArticle(this.props.match.params.number);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.number !== this.props.match.params.number) {
      // Fix bug: force to refresh article state when article id change.
      this.refreshSingleArticle(nextProps.match.params.number);
    }
  }

  async refreshSingleArticle(articleId) {
    const filterArticle = await getMovie(articleId);
    console.log('The movie => :', filterArticle);

    if (!filterArticle) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      article: filterArticle
    });
  }

  render() {
    const { article } = this.state;

    return (
      <Fragment>
        <div className="Article-img" style={{ backgroundImage: `url(${article.poster})` }}>
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
        </div>
        <div className="container">
          <div className="Article-body">
            <h1 className="Article-title">{article.title}</h1>
            <p>{article.plot}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
