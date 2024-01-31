type Props = Record<string, string>;

export const Contact = ({ contactTitle, contactValue }: Props) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};
