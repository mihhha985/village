type RevealTextProps = { children: string };

/** Word wrappers preserve natural responsive line wrapping and readable text. */
export function RevealText({ children }: RevealTextProps) {
  return (
    <span data-reveal-text>
      {children.split(" ").map((word, index) => (
        <span key={index}>
          <span className="reveal-word-mask"><span data-reveal-word>{word}</span></span>
          {" "}
        </span>
      ))}
    </span>
  );
}
