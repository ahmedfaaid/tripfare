import dynamic from 'next/dynamic';

const loadingComponent = () => <div>Loading ...</div>;
const EditorComponent = dynamic(
  () => {
    import('trix');
    return import('react-trix-rte').then((m) => m.ReactTrixRTEInput);
  },
  {
    ssr: false,
    loading: loadingComponent
  }
);

export default function Trix(props) {
  if (props.loading) return loadingComponent();

  return <EditorComponent {...props} />;
}
