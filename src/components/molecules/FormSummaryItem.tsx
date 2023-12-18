type Props = {
  label: string;
  value: string;
};

export default function FormSummaryItem({ label, value }: Props) {
  return (
    <div className="w-full flex flex-wrap items-center">
      <span className="text-lg font-nunitoBold mr-2">{label}: </span>
      <span className="text-lg font-nunitoRegular capitalize">{value}</span>
    </div>
  );
}