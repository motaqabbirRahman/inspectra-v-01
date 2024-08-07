type DataCardProps = {
  icon: React.ComponentType<any>;
  label: string;
  value: number | string;
  unit: string;
};

const DataCard = ({ icon: Icon, label, value, unit }: DataCardProps) => (
  <div className=" bg-blue-900 bg-opacity-10 p-2 rounded-md mt-2" > <div>
    <div className="flex items-center justify-between">
      <div className="h-12 w-12 bg-blue-900 bg-opacity-20 flex items-center justify-center rounded-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div className='flex flex-col items-end'>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-sm mt-1">{value} {unit}</p>
      </div>
    </div>
  </div>
  </div >
);

export default DataCard;


