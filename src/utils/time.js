export const formatTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffInSeconds = Math.floor((now - messageDate) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
};
