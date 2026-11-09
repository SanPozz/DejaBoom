import { Send } from 'lucide-react';

const CommentForm = ({ value, onChange, onSubmit, isSubmitting = false }) => (
  <form
    onSubmit={onSubmit}
    className='flex gap-4 items-start'
  >
    <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center font-black text-black text-xs shrink-0'>
      YO
    </div>
    <div className='flex-1 space-y-3'>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Escribe un comentario sobre esta reseña...'
        rows={3}
        maxLength={1000}
        className='w-full bg-background-secondary text-sm text-secondary placeholder-tertiary/30 rounded-lg p-3 border border-white/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none font-light'
      />
      <div className='flex items-center justify-between'>
        <span className='text-[10px] text-tertiary/40'>
          {value.length}/1000
        </span>
        <button
          type='submit'
          disabled={!value.trim() || isSubmitting}
          className='flex items-center gap-1.5 bg-primary hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-xs px-4 py-2 rounded-md transition-all active:scale-95 duration-100'
        >
          <Send className='w-3.5 h-3.5' />
          {isSubmitting ? 'Enviando...' : 'Publicar'}
        </button>
      </div>
    </div>
  </form>
);

export default CommentForm;
