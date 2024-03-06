import { redirect } from 'next/navigation';

const Home: React.FC = () => {
  redirect('/todo-list');
};

export default Home;
