import React, { useEffect, useState, Component} from "react";
import AppShell from "../components/AppShell";
import Post from "../components/Post";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BookDataService from "../services/book.service";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  container: {},
});

// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     alignItems: "flex-start",
//   },
//   container: {},
// });

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveBook = this.setActiveBook.bind(this);
    // this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      books: [],
      // currentBook: null,
      // currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then(response => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    BookDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {books, searchTitle} = this.state;
    const { classes } = this.props;
    // const [books, setBooks] = useState([]);
    //
    // const retrieveBooks = async () => {
    //   const response = await api.get("/stories");
    //   return response.data;
    // };
    //
    // useEffect(() => {
    //   const getAllBooks = async () => {
    //     const allBooks = await retrieveBooks();
    //     if (allBooks) setBooks(allBooks);
    //   };
    //
    //   getAllBooks();
    // }, []);

    return (
      <AppShell className={classes.root}>
      {books.map((book, idx) => (
        <Post type="book" book={book} author={book.author} key={idx} />
      ))}
      </AppShell>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
