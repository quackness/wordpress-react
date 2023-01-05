export default function BookItem (props) {
  const { book } = props;

  return (
    <div dangerouslySetInnerHTML={{__html: book.excerpt.rendered}} /> 
  )
}