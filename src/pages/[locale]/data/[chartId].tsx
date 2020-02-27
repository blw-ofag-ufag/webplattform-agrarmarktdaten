import {
  useConfiguratorState,
  ConfiguratorStateProvider
} from "@interactivethings/visualize-app";

const Hello = () => {
  const [state] = useConfiguratorState();

  return <pre>{JSON.stringify(state,null,2)}</pre>;
};

export default () => {
  return (
    <ConfiguratorStateProvider chartId="new">
      <Hello />
    </ConfiguratorStateProvider>
  );
};
