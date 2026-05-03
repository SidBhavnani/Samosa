"use client";

export default function YouTubeShort({ videoId }) {
  return (
    <div style={styles.wrapper}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Short"
        style={styles.iframe}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "400px", // controls how wide the portrait video appears
    margin: "0 auto",
    aspectRatio: "9 / 16", // key for portrait
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "12px",
  },
};
