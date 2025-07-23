
import { useQuizzData } from '../providers/QuizzDataProvider';
import QuizzSelector from '../components/QuizzSelector';
import QuizzQuestionnaire from '../components/QuizzQuestionnaire';

const Home: React.FC = () => {
  const { questions } = useQuizzData();
  return (
    <main>
      <QuizzSelector />
      {questions?.length != 0 && <QuizzQuestionnaire />}
    </main>
  );
};

export default Home;
