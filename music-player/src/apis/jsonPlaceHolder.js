import axios from 'axios';

const SERVER = `http://localhost:8090`;

export default axios.create({
	baseURL: SERVER
});
