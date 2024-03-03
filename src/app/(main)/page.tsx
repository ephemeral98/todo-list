import { redirect } from 'next/navigation';

const Home: React.FC = () => {
  redirect('/TodoList');
};

export default Home;
