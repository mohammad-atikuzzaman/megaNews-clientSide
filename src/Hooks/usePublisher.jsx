
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const usePublisher = () => {
 const { data: publishers = [], refetch } = useQuery({
   queryKey: ["publishers"],
   queryFn: async () => {
     const res = await axios.get("http://localhost:5000/publisher");
     return res.data;
   },
 });

 return [publishers, refetch];
};

export default usePublisher;