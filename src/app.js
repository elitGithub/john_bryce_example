import './styles/css/all.css'
import './styles/styles.css';
import Router from './Core/Router';
import Layout from './Helpers/Layout';

const router = new Router();
const layout = new Layout();
document.body.appendChild(layout.navbar());
router.resolve(router.getPathName());