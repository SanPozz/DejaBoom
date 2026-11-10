export const Spinner = ({ className = "size-10" }) => {
  return (
    <div role="status" aria-label="Cargando" className="flex justify-center py-12">
        <div className={`${className} rounded-full border-4 border-primary/20 border-t-primary animate-spin`} />
    </div>
  )
}