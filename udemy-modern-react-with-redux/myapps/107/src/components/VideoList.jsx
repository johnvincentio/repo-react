//

import React from 'react';
import VideoItem from './VideoItem';

import { videosType } from '../types';

import './VideoList.scss';

const VideoList = (props) => {
	const videos = props.videos.map((video) => (
		<VideoItem key={video.id.videoId} video={video} />
	));
	return (
		<div className="video-list">{videos}</div>
	)
}

VideoList.propTypes = {
	videos: videosType.isRequired // eslint-disable-line react/no-typos
};

export default VideoList;
