import dynamic from 'next/dynamic';

const loadingComponent = () => <div>Loading ...</div>;
const TrixInput = dynamic(
  () => {
    import('trix');
    return import('react-trix-rte').then((m) => m.ReactTrixRTEInput);
  },
  {
    ssr: false,
    loading: loadingComponent
  }
);

const TrixToolbar = dynamic(
  () => {
    import('trix');
    return import('react-trix-rte').then((m) => m.ReactTrixRTEToolbar);
  },
  {
    ssr: false
  }
);

export default function Trix(props) {
  if (props.loading) return loadingComponent();

  return (
    <>
      <TrixToolbar
        toolbarId='trix-toolbar-editor'
        toolbarActions={[
          'bold',
          'italic',
          'strike',
          'link',
          'heading1',
          'quote',
          'code',
          'bullet',
          'number',
          'outdent',
          'indent',
          'undo',
          'redo'
        ]}
      />
      <TrixInput toolbarId='trix-toolbar-editor' {...props} />
    </>
  );
}
