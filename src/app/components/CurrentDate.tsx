interface CurrentDateProps {
  className?: string;
}

const CurrentDate = ({ className = "" }: CurrentDateProps) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <p className={`text-sm ${className}`}>
      {formattedDate}
    </p>
  );
};

export default CurrentDate;