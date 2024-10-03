import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

interface AlertProviderWrapperProps {
  children: React.ReactNode;
  timeout?: number;
  position?: (typeof positions)[keyof typeof positions];
  transition?: (typeof transitions)[keyof typeof transitions];
  offset?: string;
  containerStyle?: React.CSSProperties;
  template?: React.ComponentType<any>;
  context?: React.Context<any>;
}

const AlertProviderWrapper: React.FC<AlertProviderWrapperProps> = ({
  children,
  timeout = 5000,
  position = positions.BOTTOM_LEFT,
  transition = transitions.FADE,
  offset = "24px",
  containerStyle,
  template = AlertTemplate,
  context,
}) => {
  return (
    <AlertProvider
      template={template}
      timeout={timeout}
      position={position}
      transition={transition}
      offset={offset}
      containerStyle={containerStyle}
      context={context}
    >
      {children}
    </AlertProvider>
  );
};

export default AlertProviderWrapper;
