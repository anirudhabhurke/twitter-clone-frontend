const visibilityContainer = (props: { visible: boolean; children: any }) => {
      if (!props.visible) return null;
      return props.children;
};

export default visibilityContainer;
