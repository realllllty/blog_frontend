import { ref } from 'vue';
export default function useLoading() {
  const isLoading = ref(false);
  const setLoading = (value) => {
    isLoading.value = value;
  };
  return {
    isLoading,
    setLoading,
  };
}
