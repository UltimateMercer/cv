export interface Entity {
  id: number | string;
}

export type ActionHandlers<T extends Entity> = {
  onView: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};
