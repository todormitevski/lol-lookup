import classes from "./InfoWindow.module.css";

export default function InfoWindow() {
  return (
    <div className={classes.infoWindow}>
      <div className={classes.infoContent}>
        <h3>MVP Designation</h3>

        <p>
          MVP status is determined using a weighted scoring system that
          evaluates overall performance and influence the summoner had over the
          match across multiple metrics:
        </p>

        <ul>
          <li>
            <strong>Combat:</strong> Kills, deaths, assists, KP and largest
            multikill
          </li>
          <li>
            <strong>Damage:</strong> Total damage to champions and objectives
          </li>
          <li>
            <strong>Playmaking:</strong> CC time and number of objectives stolen
          </li>
          <li>
            <strong>Economy:</strong> CS and gold earned
          </li>
          <li>
            <strong>Utility:</strong> Vision, healing and shielding
          </li>
        </ul>

        <div className={classes.mvpIndicators}>
          <div className={classes.mvpRow}>
            <div
              className={`${classes.mvpCircle} ${classes.mvpCircleVictory}`}
            />
            <span>Summoner designated as MVP for winning team</span>
          </div>
          <div className={classes.mvpRow}>
            <div
              className={`${classes.mvpCircle} ${classes.mvpCircleDefeat}`}
            />
            <span>Summoner designated as MVP for losing team</span>
          </div>
        </div>

        <p>
          The player with the highest weighted score on each team is designated
          as the MVP.
        </p>
      </div>
    </div>
  );
}
