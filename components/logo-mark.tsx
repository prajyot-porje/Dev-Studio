import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <div
      aria-label="Dev Studio"
      className={cn(
        'rounded-full border border-black bg-white text-black flex flex-col items-center justify-center leading-none select-none',
        className
      )}
    >
      <span className="[font-family:Didot,_Bodoni_MT,_Bodoni_72,_Times_New_Roman,_serif] text-[0.80em] font-semibold tracking-[-0.01em]">
        {'{DEV}'}
      </span>
      <span className="[font-family:Didot,_Bodoni_MT,_Bodoni_72,_Times_New_Roman,_serif] text-[0.60em] font-semibold tracking-[0.06em] mt-[0.04em]">
        STUDIO
      </span>
    </div>
  )
}
