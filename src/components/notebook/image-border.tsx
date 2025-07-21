export default function ImageBorder({ children }: React.PropsWithChildren) {
  return (
    <div className="image-border">
      {children}
      <div className="image-inset-shadow-helper">
        <div className="image-inset-shadow" />
      </div>
    </div>
  );
}
