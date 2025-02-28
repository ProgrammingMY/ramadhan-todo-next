export const generateInitialProgress = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const totalDays = lastDay.getDate();

  return Array.from({ length: totalDays }, (_, index) => ({
    date: new Date(firstDay.getFullYear(), firstDay.getMonth(), index + 1)
      .toISOString()
      .split("T")[0],
    completionRate: 0,
  }));
};
