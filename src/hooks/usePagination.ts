import { ref, Ref, watchEffect } from "vue";
const usePagination = <T>(
  dataSource: Ref<T[] | undefined>,
  pageSize: Ref<number>
) => {
  // 当前页数
  const current = ref(1);

  // 数据总条数
  const total = ref(dataSource.value?.length ?? 0);
  watchEffect(() => {
    total.value = dataSource.value?.length ?? 0;
  });

  // 返回当前页对应的数据片段
  const data = ref<T[]>();
  watchEffect(() => {
    data.value = (dataSource.value ?? []).slice(
      (current.value - 1) * pageSize.value,
      current.value * pageSize.value
    );
  });
  return { current, pageSize, total, data };
};
export default usePagination;
