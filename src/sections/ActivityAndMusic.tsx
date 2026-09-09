import GitHubActivity from './GitHubActivity';
import SpotifyMusic from './SpotifyMusic';

const ActivityAndMusic = () => {
  return (
    <section id="activity" className="section-container">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-stretch">
        <GitHubActivity />
        <SpotifyMusic />
      </div>
    </section>
  );
};

export default ActivityAndMusic;
