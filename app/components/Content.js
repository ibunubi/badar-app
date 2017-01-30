import React, {Component} from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], content:[]};

  }
  componentDidMount(){
    fetch('../../data/table-of-content.json')
    .then((res) => res.json())
    .then((data) => {
      this.setState({items: data});
    });
  }
  shouldComponentUpdate(nextProps, nextState){
    // console.log(this.props.params.contentId == nextProps.params.contentId);
    // if(this.props.params.contentId != nextProps.params.contentId){

      if(typeof this.state.items[nextProps.params.contentId] != 'undefined'){
        let onDisk = this.state.items[nextProps.params.contentId].onDisk;
        onDisk = onDisk.replace('./', '../../');
        fetch(onDisk)
        .then((res) => res.json())
        .then((data) => {
          this.setState({content: data});
        });
      }

    // }
    return true;
  }
  render() {
    let content = <div className="paper">
      <em>&#x261C; click table of content on the side bar</em>
    </div>
    if(this.state.content.hasOwnProperty('content')){
      let mainContent = this.state.content['content'];
      if(mainContent != null) {
        mainContent = mainContent.replace(/.\/data/g, '../../data');
      } else {
        mainContent = `<a href='${this.state.content['url']}'>Content for this sub menu is not downloaded properly !</a>`;
      }
      let audioFile = this.state.content['soundFile'];
      if(audioFile != '-'){
        audioFile = <audio ref="audio_tag" src={audioFile} controls autoPlay="true"/>;
      } else {
        audioFile = <em>audio not available.</em>;
      }
      audioFile = <div className="audio">{audioFile}</div>;
      content = <div className="paper">
        <h1 dangerouslySetInnerHTML={{__html: `${this.state.content['title']}` }} />
        {audioFile}
        <div dangerouslySetInnerHTML={{__html: `${mainContent}` }} />
      </div>;
    }
    return (content);
  }
}

export default Content;