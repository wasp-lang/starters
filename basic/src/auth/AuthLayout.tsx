export function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-full h-fit max-w-md bg-white px-8 py-10 rounded-lg mt-32 ">
        <div>{children}</div>
      </div>
    </div>
  );
}
