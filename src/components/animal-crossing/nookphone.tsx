export default function NookPhone() {
  const time = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <div className="nookphone">
      <div className="row">
        <img
          src="/images/animal-crossing/nookphone/signal.png"
          className="symbols signal"
        />
        <p id="time">{time}</p>
        <img
          src="/images/animal-crossing/nookphone/location.png"
          className="symbols location"
        />
      </div>
      <p className="link-title">New Horizons</p>
      <div className="apps">
        <div className="camera app"></div>
        <div className="nook-miles app"></div>
        <div className="critterpedia app"></div>
        <div className="diy app"></div>
        <div className="nook-shopping app"></div>
        <div className="terraform app"></div>
        <div className="patterns app"></div>
        <div className="map app"></div>
        <div className="chat app"></div>
      </div>
    </div>
  );
}
