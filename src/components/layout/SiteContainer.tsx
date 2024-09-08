type Props = {
  maxWidth?: number;
  children: React.ReactNode;
};

/** Component for limiting the site conents to a specific max width,
 * and centering on larger screens.
 */
export default function SiteContainer({ maxWidth, children }: Props) {
  return <div className={`min-w-screen mx-auto`}>{children}</div>;
}
