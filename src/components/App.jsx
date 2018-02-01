class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: window.exampleVideoData,
      nowPlaying: window.exampleVideoData[0]
    };

    this.handleSearchDebounced = _.debounce(this.handleSearch, 500);

  }

  playVideo(video) {
    this.setState({
      nowPlaying: video
    });
  }

  updateVideos(videos) {
    this.setState({
      nowPlaying: videos[0],
      videos: videos
    });
  }

  handleSearch() {
    var searchString = $('.form-control').val();
    // $('.form-control').val('');
    var searchObject = {
      max: 5,
      key: window.YOUTUBE_API_KEY,
      query: searchString || 'react javascript'
    };
    this.props.searchYouTube(searchObject, this.updateVideos.bind(this));
  }

  searchClick() {
    this.handleSearch();
    $('.form-control').val('');
  }

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search updateVideos={this.updateVideos.bind(this)} search={this.handleSearchDebounced.bind(this)} searchClick={this.searchClick.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.nowPlaying} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} playVideo={this.playVideo.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <Search />
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <VideoPlayer video={window.exampleVideoData[0]} />
//       </div>
//       <div className="col-md-5">
//         <VideoList videos={window.exampleVideoData} />
//       </div>
//     </div>
//   </div>
// );

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
