export default function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="serif-heading mt-3 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{text}</p>}
    </div>
  );
}
