import { useEffect, useState } from "react";
import { getStates } from "@/api/state";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface StateDropdownProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const StateDropdown = ({
  value,
  onChange,
  required,
}: StateDropdownProps) => {
  const [states, setStates] = useState<
    { stateCode: string; stateName: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getStates()
      .then((data) => {
        // If backend returns { data: [...] } or { states: [...] }, extract array
        let stateList = data;
        if (Array.isArray(data)) {
          stateList = data;
        } else if (data.states && Array.isArray(data.states)) {
          stateList = data.states;
        } else if (data.data && Array.isArray(data.data)) {
          stateList = data.data;
        }
        setStates(stateList);
        setError(null);
      })
      .catch(() => setError("Failed to load states"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading states...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <Select value={value} onValueChange={onChange} required={required}>
        <SelectTrigger>
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state.stateCode} value={state.stateCode}>
              <b>({state.stateCode})</b> {""}
              {state.stateName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
