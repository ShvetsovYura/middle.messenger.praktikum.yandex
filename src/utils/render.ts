export default function render(root: string, block: any): Element | null {
  const rootNode = document.querySelector(root);
  if (!rootNode) return null;
  rootNode.append(block.getContent());
  return rootNode;
}
